import orderModel from "../models/orderModel.js";
import enquiryModel from "../models/enquiryModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const dashboardData = async (req, res) => {
    try {
        // Get current date info
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Fetch orders statistics
        const totalOrders = await orderModel.countDocuments();
        const todayOrders = await orderModel.countDocuments({
            date: { $gte: today.getTime() }
        });
        const lastMonthOrders = await orderModel.countDocuments({
            date: { $lt: today.getTime(), $gte: currentMonth.getTime() }
        });

        // Calculate order growth
        const orderGrowth = lastMonthOrders > 0 
            ? ((todayOrders - lastMonthOrders) / lastMonthOrders) * 100 
            : 0;

        // Fetch customer statistics
        const totalCustomers = await userModel.countDocuments();
        const todayCustomers = await userModel.countDocuments({
            createdAt: { $gte: today }
        });
        const lastMonthCustomers = await userModel.countDocuments({
            createdAt: { $gte: currentMonth }
        });

        // Calculate customer growth
        const customerGrowth = lastMonthCustomers > 0 
            ? ((todayCustomers - lastMonthCustomers) / lastMonthCustomers) * 100 
            : 0;

        // Fetch enquiry statistics
        const totalEnquiries = await enquiryModel.countDocuments();
        const todayEnquiries = await enquiryModel.countDocuments({
            createdAt: { $gte: today }
        });
        const resolvedEnquiries = await enquiryModel.countDocuments({
            status: { $in: ['completed', 'contacted'] }
        });
        const lastWeekEnquiries = await enquiryModel.countDocuments({
            createdAt: { $gte: new Date(today - 7 * 24 * 60 * 60 * 1000) }
        });

        // Calculate enquiry growth
        const enquiryGrowth = lastWeekEnquiries > 0 
            ? ((todayEnquiries - lastWeekEnquiries) / lastWeekEnquiries) * 100 
            : 0;

        // Get top selling products
        const topSellingProducts = await orderModel.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.name",
                    value: { $sum: "$items.quantity" }
                }
            },
            { $sort: { value: -1 } },
            { $limit: 5 },
            {
                $project: {
                    name: "$_id",
                    value: 1,
                    _id: 0
                }
            }
        ]);

        // Get top inquiry products
        const topInquiryProducts = await enquiryModel.aggregate([
            {
                $group: {
                    _id: "$productName",
                    value: { $sum: 1 }
                }
            },
            { $sort: { value: -1 } },
            { $limit: 5 },
            {
                $project: {
                    name: "$_id",
                    value: 1,
                    _id: 0
                }
            }
        ]);

        res.json({
            success: true,
            data: {
                orders: {
                    total: totalOrders,
                    today: todayOrders,
                    growth: orderGrowth.toFixed(1)
                },
                customers: {
                    total: totalCustomers,
                    today: todayCustomers,
                    growth: customerGrowth.toFixed(1)
                },
                enquiries: {
                    total: totalEnquiries,
                    today: todayEnquiries,
                    resolved: resolvedEnquiries,
                    growth: enquiryGrowth.toFixed(1)
                },
                charts: {
                    topSellingProducts,
                    topInquiryProducts
                }
            }
        });

    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({
            success: false, 
            message: error.message
        });
    }
};

export { dashboardData }; 