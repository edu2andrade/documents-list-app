import { registerSheet } from 'react-native-actions-sheet';
import AddDocumentSheet from './components/AddDocumentSheet';

// Register sheets
registerSheet('add-document-sheet', AddDocumentSheet);

// Type definitions for TypeScript intellisense
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'add-document-sheet': {
      payload: {
        onSubmit: (name: string, version: string) => void;
      };
    };
  }
}

export {};
