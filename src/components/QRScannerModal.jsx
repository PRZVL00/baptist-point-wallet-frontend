import React, { useEffect, useRef, useState } from "react";
import { QrCode, AlertCircle, CheckCircle, Camera } from "lucide-react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const QRScannerModal = ({ show, setShow, onScan }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const codeReaderRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [scanResult, setScanResult] = useState("");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [scanAttempts, setScanAttempts] = useState(0);
  const hasScannedRef = useRef(false);

  useEffect(() => {
    if (show) {
      setScanResult("");
      setError("");
      setIsScanning(true);
      setCameraReady(false);
      setScanAttempts(0);
      hasScannedRef.current = false;
      startScanner();
    }

    return () => {
      stopScanner();
    };
  }, [show]);

  const invertImage = (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];       // Red
      data[i + 1] = 255 - data[i + 1]; // Green
      data[i + 2] = 255 - data[i + 2]; // Blue
      // Alpha channel (data[i + 3]) stays the same
    }
    return imageData;
  };

  const scanFrame = async () => {
    if (!videoRef.current || !canvasRef.current || !codeReaderRef.current || hasScannedRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        // Try scanning the original image first
        let result = await codeReaderRef.current.decodeFromCanvas(canvas);

        if (result) {
          handleScanSuccess(result);
          return;
        }
      } catch (e) {
        // Original didn't work, try inverted
      }

      try {
        // Get image data and invert it
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const invertedData = invertImage(imageData);
        ctx.putImageData(invertedData, 0, 0);

        // Try scanning the inverted image
        const result = await codeReaderRef.current.decodeFromCanvas(canvas);

        if (result) {
          handleScanSuccess(result);
          return;
        }
      } catch (e) {
        // Neither worked, continue scanning
        setScanAttempts(prev => prev + 1);
      }
    }

    // Continue scanning
    animationFrameRef.current = requestAnimationFrame(scanFrame);
  };

  const handleScanSuccess = (result) => {
    if (hasScannedRef.current) return;

    hasScannedRef.current = true;
    const qrValue = result.getText();

    console.log("✅ QR Code Scanned:", qrValue);
    console.log("Format:", result.getBarcodeFormat());

    setScanResult(qrValue);
    setIsScanning(false);

    // Stop camera immediately before callback
    stopScanner();

    if (onScan) {
      onScan(qrValue);
    }

    // Close modal after showing success message
    setTimeout(() => {
      setShow(false);
      setScanResult("");
    }, 1500);
  };

  const startScanner = async () => {
    try {
      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        setError("No camera found on this device");
        setIsScanning(false);
        return;
      }

      console.log("Available cameras:", videoInputDevices);

      const backCamera = videoInputDevices.find(device =>
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('rear')
      );

      const selectedDeviceId = backCamera?.deviceId || videoInputDevices[0]?.deviceId;

      console.log("Using camera:", selectedDeviceId);

      const constraints = {
        video: {
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      // Get video stream
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          setCameraReady(true);
          console.log("Camera ready, starting scan loop");
          scanFrame();
        };
      }

      console.log("Scanner started successfully");
    } catch (err) {
      console.error("Camera error:", err);
      setError(`Unable to access camera: ${err.message || 'Permission denied'}`);
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Stop video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        console.log("Stopping track:", track.label);
        track.stop();
      });
      videoRef.current.srcObject = null;
    }

    // Reset code reader
    if (codeReaderRef.current) {
      try {
        if (typeof codeReaderRef.current.reset === "function") {
          codeReaderRef.current.reset();
        }
        codeReaderRef.current = null;
      } catch (err) {
        console.warn("Failed to reset code reader:", err);
      }
    }

    console.log("Scanner stopped");
  };

  const handleClose = () => {
    stopScanner();
    setShow(false);
    setScanResult("");
    setError("");
    setIsScanning(false);
    setCameraReady(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <QrCode className="text-purple-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">Scan QR Code</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
          >
            ×
          </button>
        </div>

        <div className="text-center">
          {/* Video Container */}
          <div className="relative w-full aspect-square bg-gray-900 rounded-2xl overflow-hidden mb-4 border-4 border-dashed border-gray-300">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Hidden canvas for image processing */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera overlay */}
            {!cameraReady && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
                <Camera className="text-white mb-2 animate-pulse" size={48} />
                <p className="text-white text-sm">Initializing camera...</p>
              </div>
            )}

            {/* Scanning overlay with guide */}
            {isScanning && cameraReady && !scanResult && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Scanning frame */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-56 h-56 border-4 border-purple-500 rounded-2xl relative">
                    {/* Corner markers */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-purple-400"></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-purple-400"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-purple-400"></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-purple-400"></div>

                    {/* Scanning line animation */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan"></div>
                    </div>
                  </div>
                </div>

                {/* Debug info */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <div className="inline-block bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    Scanning inverted QR... ({scanAttempts} attempts)
                  </div>
                </div>
              </div>
            )}

            {/* Success overlay */}
            {scanResult && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-500/90">
                <div className="text-center">
                  <CheckCircle className="text-white mx-auto mb-2" size={64} />
                  <p className="text-white font-bold text-lg">Scan Successful!</p>
                </div>
              </div>
            )}

            {/* Error overlay */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-500/90">
                <div className="text-center p-4">
                  <AlertCircle className="text-white mx-auto mb-2" size={48} />
                  <p className="text-white font-semibold text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mb-4 min-h-[4rem]">
            {scanResult ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-600 font-semibold mb-1">Scanned Code:</p>
                <p className="text-sm font-mono text-green-800 break-all">
                  {scanResult}
                </p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            ) : (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-sm font-semibold text-purple-800 mb-2">
                  {cameraReady ? "Position QR code in the frame" : "Loading camera..."}
                </p>
                <div className="text-xs text-purple-600 space-y-1 text-left">
                  <p>✨ Supports inverted (white on black) QR codes</p>
                  <p>• Hold steady and ensure good lighting</p>
                  <p>• Keep QR code flat and in focus</p>
                  <p>• Try moving closer or further away</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {error && (
              <button
                onClick={() => {
                  setError("");
                  setIsScanning(true);
                  setScanAttempts(0);
                  startScanner();
                }}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Retry
              </button>
            )}
            <button
              onClick={handleClose}
              className={`${error ? "flex-1" : "w-full"
                } bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg`}
            >
              {scanResult ? "Close" : "Cancel"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(224px); }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QRScannerModal;