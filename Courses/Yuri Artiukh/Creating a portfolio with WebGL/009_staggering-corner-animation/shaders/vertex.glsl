uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
uniform vec4 uCorners;
varying vec2 vUv;
varying vec2 vSize;

void main() {
  vUv = uv;
  vec3 pos = position;

  vec4 defaultState = modelMatrix * vec4(pos, 1.0);
  vec4 fullScreenState = vec4(pos, 1.0);
  fullScreenState.x *= uResolution.x / uQuadSize.x;
  fullScreenState.y *= uResolution.y / uQuadSize.y;
  float cornersProgress = mix(
    mix(uCorners.z, uCorners.w, uv.x),
    mix(uCorners.x, uCorners.y, uv.x),
    uv.y
  );

  vec4 finalState = mix(defaultState, fullScreenState, cornersProgress);

  vSize = mix(uQuadSize, uResolution, uProgress);

  gl_Position = projectionMatrix * viewMatrix * finalState;
}
