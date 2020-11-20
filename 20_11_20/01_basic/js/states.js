var svg = document.querySelector('svg');
var viewBox = svg.viewBox.baseVal;

function resetZoom(){
	viewBox.x = 0;
	viewBox.y = 0;
	viewBox.width = 583;
	viewBox.height = 350;
}

function zoomInOut(zoom_factor) {

	var vb_mid_x = viewBox.x + viewBox.width/2;
	var vb_mid_y = viewBox.y + viewBox.height/2;

	viewBox.width  *= zoom_factor;
	viewBox.height *= zoom_factor;

	viewBox.x = vb_mid_x - viewBox.width/2;
	viewBox.y = vb_mid_y - viewBox.height/2;

	// vb = [vb_mid_x-new_width/2, vb_mid_y-new_height/2, new_width, new_height ];
	// svg.setAttribute('viewBox',vb)
}

var animHandle = null;

function setTarget() {
	animHandle = requestAnimationFrame(repeatOften);
}

function repeatOften(){
	var vb = svg.getAttribute('viewBox').split(',').map((el)=>Number(el));

	vb[0] += 1;
	s.setAttribute('viewBox',vb)
	animHandle = requestAnimationFrame(repeatOften);
}


// We select the SVG into the page
// var svg = document.querySelector('svg');

// If browser supports pointer events
if (window.PointerEvent) {
  svg.addEventListener('pointerdown', onPointerDown); // Pointer is pressed
  svg.addEventListener('pointerup', onPointerUp); // Releasing the pointer
  svg.addEventListener('pointerleave', onPointerUp); // Pointer gets out of the SVG area
  svg.addEventListener('pointermove', onPointerMove); // Pointer is moving
} else {
  // Add all mouse events listeners fallback
  svg.addEventListener('mousedown', onPointerDown); // Pressing the mouse
  svg.addEventListener('mouseup', onPointerUp); // Releasing the mouse
  svg.addEventListener('mouseleave', onPointerUp); // Mouse gets out of the SVG area
  svg.addEventListener('mousemove', onPointerMove); // Mouse is moving

  // Add all touch events listeners fallback
  svg.addEventListener('touchstart', onPointerDown); // Finger is touching the screen
  svg.addEventListener('touchend', onPointerUp); // Finger is no longer touching the screen
  svg.addEventListener('touchmove', onPointerMove); // Finger is moving
}

// Create an SVG point that contains x & y values
var point = svg.createSVGPoint();
// This function returns an object with X & Y values from the pointer event
function getPointFromEvent (event) {
  
  // If even is triggered by a touch event, we get the position of the first finger
  if (event.targetTouches) {
    point.x = event.targetTouches[0].clientX;
    point.y = event.targetTouches[0].clientY;
  } else {
    point.x = event.clientX;
    point.y = event.clientY;
  }
  
  // We get the current transformation matrix of the SVG and we inverse it
  var invertedSVGMatrix = svg.getScreenCTM().inverse();
  
  return point.matrixTransform(invertedSVGMatrix);
}

// This variable will be used later for move events to check if pointer is down or not
var isPointerDown = false;

// This variable will contain the original coordinates when the user start pressing the mouse or touching the screen
var pointerOrigin;

// Function called by the event listeners when user start pressing/touching
function onPointerDown(event) {
  isPointerDown = true; // We set the pointer as down
  
  // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
  pointerOrigin = getPointFromEvent(event);
}



// Function called by the event listeners when user start moving/dragging
function onPointerMove (event) {
  // Only run this function if the pointer is down
  if (!isPointerDown) {
    return;
  }
  // This prevent user to do a selection on the page
  event.preventDefault();

  // Get the pointer position as an SVG Point
  var pointerPosition = getPointFromEvent(event);

  // Update the viewBox variable with the distance from origin and current position
  // We don't need to take care of a ratio because this is handled in the getPointFromEvent function
  viewBox.x -= (pointerPosition.x - pointerOrigin.x);
  viewBox.y -= (pointerPosition.y - pointerOrigin.y);
}

function onPointerUp() {
  // The pointer is no longer considered as down
  isPointerDown = false;
}