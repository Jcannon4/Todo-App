// env.d.ts (Create this new file)
declare module "@env" {
  // This tells TypeScript what types to expect when you import from '@env'
  export const DEV_IP_ADDRESS: string;
  // Add any other variables from your .env file here
}
