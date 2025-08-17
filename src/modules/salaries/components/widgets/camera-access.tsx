import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type CameraViewHandle = {
  stop: () => void;
};

type CameraViewProps = {
  active: boolean;
};

const CameraView = forwardRef<CameraViewHandle, CameraViewProps>(
  ({ active }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };

    useImperativeHandle(ref, () => ({
      stop: stopCamera,
    }));

    useEffect(() => {
      const startCamera = async () => {
        try {
          const s = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          setStream(s);
        } catch (err) {
          setError("Tidak bisa mengakses kamera, periksa permission browser.");
        }
      };

      if (active) {
        startCamera();
      } else {
        stopCamera();
      }

      return () => stopCamera();
    }, [active]);

    return (
      <div className="flex flex-col items-center">
        {error && <p className="text-red-500">{error}</p>}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
    );
  }
);

export default CameraView;
