// custom.d.ts
declare module 'react-native-router-flux' {
    import { ComponentType } from 'react';
  
    export interface SceneProps {
      key: string;
      component: ComponentType<any>;
      title?: string;
      initial?: boolean;
    }
  
    export const Router: React.ComponentType;
    export const Scene: React.ComponentType<SceneProps>;
    export const Stack: React.ComponentType;
    export const Actions: {
      home: () => void;
    };
  }
  