interface ContentContainerProps {
  children: React.ReactNode;
}

export const ContentContainer = ({ children }: ContentContainerProps) => {
  return <div className="max-w-7xl mx-auto px-4">{children}</div>;
};