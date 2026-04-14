import React, { use, useEffect, useRef } from 'react'
import { useFrame, useGraph, useLoader } from '@react-three/fiber'
import { useGLTF , useFBX, useAnimations} from '@react-three/drei'
import { useControls } from 'leva'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

const corresponding = {
  A: 'viseme_PP', B: 'viseme_kk', C: 'viseme_I', D: 'viseme_AA',
  E: 'viseme_O', F: 'viseme_U', G: 'viseme_FF', H: 'viseme_TH',
  I: 'viseme_S', J: 'viseme_kk', K: 'viseme_kk', L: 'viseme_TH',
  M: 'viseme_PP', N: 'viseme_kk', O: 'viseme_O', P: 'viseme_PP',
  Q: 'viseme_kk', R: 'viseme_O', S: 'viseme_S', T: 'viseme_kk',
  U: 'viseme_U', V: 'viseme_FF', W: 'viseme_U', X: 'viseme_PP',
  Y: 'viseme_I', Z: 'viseme_S'
}

export function Avatar(props) {
  const { smoothness, intensity } = useControls({
    smoothness: { value: 0.1, min: 0.01, max: 0.9 },
    intensity: { value: 0.8, min: 0.1, max: 1.5 }
  });

  const morphTargets = useRef({})
  const targetMorphs = useRef({})

  const initializeMorphTargets = (nodes) => {
    Object.values(corresponding).forEach((viseme) => {
      if (!morphTargets.current[viseme]) {
        morphTargets.current[viseme] = 0;
        targetMorphs.current[viseme] = 0;
      }
    });
  };

  const { scene } = useGLTF('/models/68a202ee4dd25e58782ee8a7.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const fbx = useFBX('/animation/simpleStanding.fbx')

  useEffect(() => {
    if (nodes.Hips && nodes.Hips.children) {
      console.log('Model bones:', nodes.Hips.children.map(bone => bone.name));
    }
    if (fbx.animations.length > 0) {
      console.log('Animation tracks:', fbx.animations[0].tracks.map(track => track.name));
    }
  }, [nodes, fbx]);

  const { actions } = useAnimations(fbx.animations, clone)
  console.log('Available actions:', Object.keys(actions))

  useEffect(() => {
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0) {
      const firstAction = actions[actionNames[0]];
      if (firstAction) {
        firstAction.reset().play();
        firstAction.setEffectiveTimeScale(1);
        firstAction.loop = THREE.LoopRepeat;
      }
    }
    return () => {
      actionNames.forEach(name => {
        if (actions[name]) actions[name].stop();
      });
    };
  }, [actions]);

  useFrame((state, delta) => {
    if (!nodes.Wolf3D_Head || !nodes.Wolf3D_Teeth) return;
    if (Object.keys(morphTargets.current).length === 0) {
      initializeMorphTargets(nodes);
    }
  });

  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      {['Wolf3D_Hair', 'Wolf3D_Body', 'Wolf3D_Outfit_Bottom', 'Wolf3D_Outfit_Footwear', 'Wolf3D_Outfit_Top', 'EyeLeft', 'EyeRight', 'Wolf3D_Head', 'Wolf3D_Teeth'].map((key) => (
        <skinnedMesh
          key={key}
          name={key}
          geometry={nodes[key].geometry}
          material={materials[nodes[key].material?.name] || materials.Wolf3D_Skin}
          skeleton={nodes[key].skeleton}
          morphTargetDictionary={nodes[key].morphTargetDictionary}
          morphTargetInfluences={nodes[key].morphTargetInfluences}
        />
      ))}
    </group>
  )
}

useGLTF.preload('/models/68a202ee4dd25e58782ee8a7.glb')
