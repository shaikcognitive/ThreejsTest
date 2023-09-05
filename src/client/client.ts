import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import  TWEEN  from '@tweenjs/tween.js';


const raycaster = new THREE.Raycaster();
const textureLoader = new THREE.TextureLoader();
const loader = new FBXLoader();
const loader1 = new FBXLoader();
const loader2 = new FBXLoader();
const mouse = new THREE.Vector2();
const scene = new THREE.Scene()
let isButtonClicked = false;

/////////////////////////////////////// Camera setup //////////////////////////////////////////

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0.045,0.009,2.797);
camera.rotation.set(0,0,0);
camera.scale.set(1,1,1);
scene.add(camera);

////////////////////////////////////////Light Setup///////////////////////////////////////////

const ambientLight = new THREE.AmbientLight(0xffffff, 5); 
const hemisphereLight = new THREE.HemisphereLight(0xA6A6A6, 0xffffff, 5); 
hemisphereLight.position.set(0,10,0);

scene.add(hemisphereLight);
scene.add(ambientLight);

/////////////////////////////////////// Room Setup ////////////////////////////////////////////

const roomwallsprite = textureLoader.load('Textures/Roomwall.png');
const wallmat = new THREE.SpriteMaterial({ map: roomwallsprite });
const sprite = new THREE.Sprite(wallmat);
sprite.position.set(0, 0, 0);
sprite.scale.set(screen.width, screen.height, 5);
sprite.renderOrder = 1;
scene.add(sprite);

const leftsidewall = textureLoader.load('Textures/left.png');
const leftsidewallmat = new THREE.SpriteMaterial({ map: leftsidewall });
const sprite1 = new THREE.Sprite(leftsidewallmat);
sprite1.position.set(-3.2, 0.1, 0);
sprite1.scale.set(0.250, 3.100, 1);
sprite1.renderOrder = 2;
scene.add(sprite1);

const rightsidewall = textureLoader.load('Textures/Right.png');
const rightsidewallmat = new THREE.SpriteMaterial({ map: rightsidewall });
const sprite2 = new THREE.Sprite(rightsidewallmat);
sprite2.position.set(3.3, 0.1, 0);
sprite2.scale.set(0.250, 3.100, 1);
sprite2.renderOrder = 2;
scene.add(sprite2);

const Floor = textureLoader.load('Textures/floor.png');
const Floormat = new THREE.SpriteMaterial({ map: Floor });
const sprite3 = new THREE.Sprite(Floormat);
sprite3.position.set(0, -1.375, 0);
sprite3.scale.set(screen.width, 1, 1);
sprite3.renderOrder = 1;
scene.add(sprite3);

//////////////////////// Creating a start panel /////////////////////////////
const startpanel = textureLoader.load('Textures/Roomwall.png');
const startmat = new THREE.SpriteMaterial({ map: startpanel });
const sprite4 = new THREE.Sprite(startmat);
sprite4.position.set(0, 0, 2);
sprite4.rotation.set(0,0,0);
sprite4.scale.set(screen.width, screen.height, 1);
sprite4.renderOrder = 3;
sprite4.name = "Stat_panel";
scene.add(sprite4);

document.addEventListener('click', onMouseClick);
function onMouseClick(event: MouseEvent) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object.name;
       // console.log('Intersected Object  = = = = ', intersectedObject);
        if(intersectedObject === "Stat_panel")
        {
            intersects[0].object.scale.set(0,0,0);
            isButtonClicked = true;
        }
    }
};

/////////////////////////////////////// Hand indicator /////////////////////////////////////
const Hand = textureLoader.load('Textures/hand.png');
const handmat = new THREE.SpriteMaterial({ map: Hand });
const sprite5 = new THREE.Sprite(handmat);
sprite5.position.set(0.4, -0.45, 1.25);
sprite5.scale.set(0.12, 0.24, 0.12);
sprite5.renderOrder = 1;

function animatehand(){
    scene.add(sprite5);
    const positionTween = new TWEEN.Tween(sprite5.position)
    .to({ x: 0.8, y: -0.45, z: 1.25 }, 500) 
    .onComplete(() => {
        // When the tween completes, restart it
       // resethand();
    });
    positionTween.start();
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta(); 
        TWEEN.update();// Get the time since the last frame            
         }
         animate();      
};
// function resethand()
// {
//     const positionTween = new TWEEN.Tween(sprite5.position)
//     .to({ x: 0.4, y: -0.45, z: 1.25 }, 500) 
//     .onComplete(() => {
//         // When the tween completes, restart it
//         animatehand();
//     });
//     positionTween.start();
//     const clock = new THREE.Clock();
//     function animate() {
//         requestAnimationFrame(animate);
//         const delta = clock.getDelta(); 
//         TWEEN.update();// Get the time since the last frame            
//          }
//          animate();  
// };
/////////////////////////////////////// Table model /////////////////////////////////////////

loader.load('Models/FBX/Table_Black.fbx', (fbx) => {
    scene.add(fbx); 
    const table = fbx;
    table.position.set(-0.4,-1.25,0.91);
    table.rotation.set(0,0,0);
    table.scale.set(0.014,0.014,0.014);
  });
//////////////////////////////////////// Left side model ///////////////////////////////////////


loader.load('Models/FBX/Buddy_With_CarCombine.fbx', (fbx) => {
   
    scene.add(fbx); 
    const adult = fbx;
    adult.position.set(-0.519,-1.55,0.9);
    adult.rotation.set(0,0,0);
    adult.scale.set(0.02,0.02,0.02);
    //// material change ////
    const meshes = adult.children;
    meshes.forEach((mesh) => {
    console.log("meshesh___  "+mesh.name);
       if(mesh.name == "Car")
       {
       
       }
    });

    const mixer = new THREE.AnimationMixer(adult);
    const animations = fbx.animations;
    animations.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopOnce, 1);
    action.play(); 
    });
    /// 
    function carmove(){
        setTimeout(function () {
        animatehand();
        }, 1800);
        const meshes = adult.children;
        meshes.forEach((mesh) => {
        console.log("meshesh___  "+mesh.name);
           if(mesh.name == "Car")
           {
            const positionTween = new TWEEN.Tween(mesh.position)
            .to({ x: 20, y: 9.855, z: -6.76 }, 500) 
            .easing(TWEEN.Easing.Linear.None) 
            positionTween.start();
           }
        });
    };
    // Set time out
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta(); 
        TWEEN.update();// Get the time since the last frame
        if(mixer)
          {
           if(isButtonClicked === true)
            {
              mixer.update(delta);
              setTimeout(function() {
                    carmove();
                }, 1800);
            }
           }
           adult.position.set(-0.519,-1.55,0.9);
           adult.rotation.set(0,0,0);
           adult.scale.set(0.02,0.02,0.02);              
         }
         animate();      

////////////////////////////////////  Right_sided model ////////////////////////////

////////////////////////////////// IDLE POStion ////////////////////////////

let mixer1: THREE.AnimationMixer | undefined;
let model1: THREE.Group;
loader1.load('Models/FBX/Idel_WithCarCombine.fbx', (fbx) => {
    model1 = fbx as THREE.Group;

    if(model1)
    {
        mixer1 = new THREE.AnimationMixer(model1);
        const clip1 = model1.animations[0];
        if (clip1) {
            const action1 = mixer1.clipAction(clip1);
            action1.play();
        }
        scene.add(model1);
        model1.visible = true;
        const meshes = model1.children;
        meshes.forEach((mesh) => {
        if(mesh.name === "Car_Body")
        {
            mesh.name = 'Car_Idle';
           // console.log("asdfasdfaefae ===== "+mesh.name)
        }
        });
        model1.position.set(0.7,-1.568,0.9);
        model1.rotation.set(0,0,0);
        model1.scale.set(0.02,0.02,0.02);
    }
});  

//////////////////////////////////  Car child pushing /////////////////////////////

let mixer2: THREE.AnimationMixer | undefined; // Declare the type explicitly
let model2: THREE.Group;
loader2.load('Models/FBX/Buddy_With_CarCombine_BlueShirt.fbx', (fbx) => {
    model2 = fbx as THREE.Group;
    if(model2)
    {
    model2.visible = false;
    mixer2 = new THREE.AnimationMixer(model2);

    // Assuming you have named animations in your FBX file
    const clip2 = model2.animations[0]
    if (clip2) {
        const action2 = mixer2.clipAction(clip2);
        action2.setLoop(THREE.LoopOnce, 1);
        action2.play();
    }
    scene.add(model2);
    // Position, scale, or rotate the second model if needed
    model2.position.set(0.65,-1.565,0.9);
    model2.rotation.set(0,0,0);
    model2.scale.set(0.02,0.02,0.02);
    }

    document.addEventListener('click', onMouseClick);
        function onMouseClick(event: MouseEvent) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          const intersectedObject = intersects[0].object.name;
        //  console.log('Intersected Object:', intersectedObject);
          if(intersectedObject === "Car_Idle")
          {
            model1.visible = false;
            model2.visible = true;  
            sprite5.visible = false;
        setTimeout(function () {
            const meshes = model2.children;
            meshes.forEach((mesh) => {
            if(mesh.name === "Car")
            {
                const positionTween = new TWEEN.Tween(mesh.position)
            .to({ x: 20, y: 9.855, z: -6.76 }, 1000) 
            .easing(TWEEN.Easing.Linear.None) 
            positionTween.start();
            }
            });
           const clock = new THREE.Clock();
           function animate() {
           requestAnimationFrame(animate);
           const delta = clock.getDelta(); 
           TWEEN.update();// Get the time since the last frame
         }
         animate();
                }, 1800);  
         }
        }
      }
      
   
const clock = new THREE.Clock();

function animate() {
    const delta = clock.getDelta();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if(model1.visible === false && model2.visible === true)
    {
        //console.log("entered into model2 ");
      if(mixer2)
      {
        mixer2.update(delta);
        model2.position.set(0.65,-1.565,0.9);
        model2.rotation.set(0,0,0);
        model2.scale.set(0.02,0.02,0.02);
      }
      
    }
    if(model1.visible === true && model2.visible === false)
    {
        //console.log("entered into model1");
       // mixer1.update(delta);
      if(mixer1)
      {
        mixer1.update(delta);
      }
    }
};
animate();
});
});



//   loader.load('Models/FBX/Idel_WithCarCombine.fbx', (fbx) => {
   
//     scene.add(fbx); 
//     const adult = fbx;
//     //caridle();
//     adult.position.set(0.7,-1.568,0.9);
//     adult.rotation.set(0,0,0);
//     adult.scale.set(0.02,0.02,0.02);
//     const mixer = new THREE.AnimationMixer(adult);
//     const animations = fbx.animations;
//     animations.forEach((clip) => {
//       const action = mixer.clipAction(clip);
//      action.play();
     
//     });
   
  
//     // Set time out
//     setTimeout(function() {
//         const clock = new THREE.Clock();
//         function animate() {
//            requestAnimationFrame(animate);
//            const delta = clock.getDelta(); 
//            TWEEN.update();// Get the time since the last frame
//            mixer.update(delta);
//            adult.position.set(0.7,-1.568,0.9);
//            adult.rotation.set(0,0,0);
//            adult.scale.set(0.02,0.02,0.02);
//            renderer.render(scene, camera);
          
//          }
//          animate();      }, 800);
//   });

////////////////////////////////////// rendering of webgl////////////////////////////////////////////////

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
function render() {
    renderer.render(scene, camera)
}
function animate() {
    requestAnimationFrame(animate)

    render()
}
animate()

