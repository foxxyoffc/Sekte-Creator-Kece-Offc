export default function Watermark() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-neutral-90095 backdrop-blur-sm border-t border-red-90030 py-3 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-sm text-neutral-500">
          <span className="text-red-500">❤<span>    
          <span className="font-medium">Code By FoxxyOffc</span>{" "}
          <span className="text-red-500">❤</span>
        </p>
      </div>
    </footer>
  );
}
