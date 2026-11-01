import './globals.css';

export const metadata = {
  title: 'Recall Radar',
  description: 'Personalized recall intelligence for retailers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
