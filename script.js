let cam;

// Switch between display modes
cam.mode = 'fitHeight';  // Fit to height
cam.mode = 'fitWidth';   // Fit to width
cam.mode = 'fixed';      // Fixed size (640x480 default)

// For fixed mode, set custom size
cam.fixedWidth = 800;
cam.fixedHeight = 600;
cam.mode = 'fixed';

// Switch between front and back camera
cam.active = 'environment';  // Back camera
cam.active = 'user';         // Front camera

// Toggle camera
function switchCamera() {
  cam.active = cam.active === 'user' ? 'environment' : 'user';
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    cam = createPhoneCamera('user', true, 'fitHeight');
    
    // Option 1: Tap to enable (recommended)
    enableCameraTap();
    
    // Option 2: Button to enable
    // enableCameraButton();
    
    // Option 3: Use callback when camera is ready
    cam.onReady(() => {
      console.log('Camera initialized!');
      // Start ML5 models here
    });
  }

  cam.onReady(() => {
  // Camera is ready - safe to start ML5 models
});

let model = ml5.faceMesh(options, modelLoaded);

function modelLoaded() {
  // Model is ready - safe to start detection
  model.detectStart(cam.videoElement, gotResults);
}




  