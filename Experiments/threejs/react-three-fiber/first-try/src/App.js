import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useThree, useRender, useLoader, extend } from 'react-three-fiber'
import { useTransition, a } from 'react-spring'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

extend({ OrbitControls })
const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useRender(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

function Model({ url }) {
  const model = useLoader(GLTFLoader, url, loader => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco-gltf/')
    loader.setDRACOLoader(dracoLoader)
  })
  return (
    <group rotation={[-Math.PI / 2, 0, -1]} position={[0, 0, 0]} scale={[0.04, 0.04, 0.04]}>
      {model.map(({ geometry, material }) => {

        const Material = 'meshStandardMaterial'
        return (
          <mesh
            key={geometry.uuid}
            geometry={geometry}
            castShadow={true}
            receiveShadow={true}
          >
            <Material attach="material" map={material.map} roughness={1} />
          </mesh>
        )
      })}
    </group>
  )
}

function Loading() {
  const [finished, set] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => set(true)
    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setWidth((itemsLoaded / itemsTotal) * 200)
  }, [])

  const props = useTransition(finished, null, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  })

  return props.map(
    ({ item: finished, key, props: { opacity, width } }) =>
      !finished && (
        <a.div className="loading" key={key} style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width }} />
          </div>
        </a.div>
      ),
  )
}

export default function App() {
  return (
    <>
      <div className="bg" />
      <h1>Save up to 52% on your car insurance.</h1>
      <h2>Simple pricing. Fair rates. All in an app.</h2>
      <Canvas camera={{ position: [0, 0, 22] }} shadowMap>
        <ambientLight intensity={1.5} />
        <pointLight intensity={2} position={[-10, -25, -10]} />
        <spotLight
          castShadow
          intensity={.5}
          angle={Math.PI / 8}
          position={[25, 25, 15]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <fog attach="fog" args={['#cc7b32', 1, 20]} />
        <Model url="/scene.gltf" />
        <Controls
          autoRotate
          enablePan={false}
          enableZoom={true}
          enableDamping
          dampingFactor={0.5}
          rotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <div className="layer" />
      <Loading />
      <a href="https://joinroot.com" className="top-left" children="Get a quote" />
    </>
  )
}
