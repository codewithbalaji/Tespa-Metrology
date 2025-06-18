interface Window {
  google: {
    translate: {
      TranslateElement: {
        new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            layout?: number;
            autoDisplay?: boolean;
          },
          element: string
        ): TranslateElementInstance;
        InlineLayout: {
          HORIZONTAL: number;
          SIMPLE: number;
          VERTICAL: number;
        };
      };
    };
  };
  googleTranslateElementInit: () => void;
}

