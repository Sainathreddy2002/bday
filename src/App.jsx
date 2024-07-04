/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, OrthographicCamera, Stars, Text,Html } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player';
function Text1() {
  // const ref=useRef(null);
  // useFrame(()=>(ref.current.rotation.y += 0.01))
  // const gltf=useLoader(GLTFLoader,'../public/models/happy_birthday_sign/scene.gltf')
  return <Text
  scale={[1, 1, 1]}
  color="black" // default
  anchorX="center" // default
  anchorY="middle" 
  material={""}// default
>
  Happy Birthday Purvi!
  <meshPhysicalMaterial attach="material" color="purple" clearcoat={1} clearcoatRoughness={0.1} />
</Text>
}
function Cake(){
  const ref=useRef(null);
  useFrame(()=>(ref.current.rotation.y += 0.01))
  const gltf=useLoader(GLTFLoader,'../public/models/cake_3d/scene.gltf')
  return <primitive object={gltf.scene} scale={0.3} ref={ref} position-y={-1} />
}
function Confetti(){
  const gltf=useLoader(GLTFLoader, '../public/models/confetti/scene.gltf')
  let mixer
    if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach(clip => {
            const action = mixer.clipAction(clip)
            action.play();
        });
    }

    useFrame((state, delta) => {
        mixer?.update(delta)
    })
    gltf.scene.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            child.material.side = THREE.FrontSide
        }
    })
  return <primitive object={gltf.scene} position-y={-5}  scale={0.01} />
}
function App() {
  // const audioRef = useRef(null);

  useEffect(() => {
    // const audio = audioRef.current;
    // if (audio) {
    //   audio.play().catch(error => {
    //     console.log('Error playing audio:', error);
    //   });
    // }
  }, []);
  return (
    <div style={{background: 'linear-gradient(180deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',width:"100vw",height:"100vh"}} id="canvas-container">
    <Canvas>
      <OrbitControls />
  <Stars />
  <OrthographicCamera/>
  <Html
  as='div' 
  prepend 
  style={{top:0,position:"absolute",display:"flex",flex:1,justifyContent:"flex-start",alignItems:"flex-start"}}
  distanceFactor={10} 
  zIndexRange={[100, 0]}
  position={[-7,4,0]} 
>
<AudioPlayer
        autoPlay
        src="../public/tainhacchuong.net_anne-marie-birthday.mp3"
        loop
        onPlay={() => console.log("onPlay")}
      />
</Html>
  <pointLight position={[10, 10, 10]} />
  <ambientLight intensity={5} color={"violet"} />
  <directionalLight color="red" position={[0, 0, ]} />
  <Text1/>
  <Cake/>
  <Confetti/>
</Canvas>

{/* <audio ref={audioRef} src="../public/tainhacchuong.net_anne-marie-birthday.mp3" loop style={{ display: 'none' }} /> */}
    </div>
  )
}

export default App
