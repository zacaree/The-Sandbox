import * as THREE from 'three';
import ASScroll from '@ashthornton/asscroll'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'
// import testTexture from '../img/texture.jpg';
import * as dat from 'dat.gui'
import gsap from 'gsap'
import barba from '@barba/core';


export default class Sketch {
  constructor(options) {
    this.container = options.domElement;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 10, 1000);
    this.camera.position.z = 600;

    this.camera.fov = 2 * Math.atan((this.height / 2) / 600) * 180 / Math.PI;
    this.imagesAdded = 0;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setPixelRatio(2);
    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.materials = [];

    this.asscroll = new ASScroll({
      disableRaf: true,
      ease: 0.3
    });

    this.asscroll.enable()
    this.time = 0;
    // this.setupSettings()

    this.addObjects()
    // this.addClickEvents()
    this.resize()
    this.render();

    // this.barba()

    this.setupResize()
  }

  // barba() {
  //   this.animationRunning = false;
  //   let that = this;
  //   barba.init({
  //     transitions: [{
  //       name: 'from-home-transition',
  //       from: {
  //         namespace: ["home"]
  //       },
  //       leave(data) {
  //         that.animationRunning = true;
  //         that.asscroll.disable();
  //         return gsap.timeline()
  //           .to(data.current.container, {
  //             opacity: 0.,
  //             duration: 0.5
  //           })
  //       },
  //       enter(data) {
  //         that.asscroll = new ASScroll({
  //           disableRaf: true,
  //           containerElement: data.next.container.querySelector("[asscroll-container]")
  //         })
  //         that.asscroll.enable({
  //           newScrollElements: data.next.container.querySelector('.scroll-wrap')
  //         })
  //         return gsap.timeline()
  //           .from(data.next.container, {
  //             opacity: 0.,
  //             onComplete: () => {
  //               that.container.style.visibility = "hidden";
  //               that.animationRunning = false
  //             }
  //           })
  //       }
  //     },
  //     {
  //       name: 'from-inside-page-transition',
  //       from: {
  //         namespace: ["inside"]
  //       },
  //       leave(data) {
  //         that.asscroll.disable();
  //         return gsap.timeline()
  //           .to('.curtain', {
  //             duration: 0.3,
  //             y: 0
  //           })
  //           .to(data.current.container, {
  //             opacity: 0.
  //           })
  //       },
  //       enter(data) {
  //         that.asscroll = new ASScroll({
  //           disableRaf: true,
  //           containerElement: data.next.container.querySelector("[asscroll-container]")
  //         })
  //         that.asscroll.enable({
  //           horizontalScroll: true,
  //           newScrollElements: data.next.container.querySelector('.scroll-wrap')
  //         })
  //         // cleeaning old arrays
  //         that.imageStore.forEach(m => {
  //           that.scene.remove(m.mesh)
  //         })
  //         that.imageStore = []
  //         that.materials = []
  //         that.addObjects();
  //         that.resize();
  //         that.addClickEvents()
  //         that.container.style.visibility = "visible";


  //         return gsap.timeline()
  //           .to('.curtain', {
  //             duration: 0.3,
  //             y: "-100%"
  //           })
  //           .from(data.next.container, {
  //             opacity: 0.
  //           })
  //       }
  //     }
  //     ]
  //   });
  // }

  // addClickEvents() {
  //   this.imageStore.forEach(i => {
  //     i.img.addEventListener('click', () => {
  //       let tl = gsap.timeline()
  //         .to(i.mesh.material.uniforms.uCorners.value, {
  //           x: 1,
  //           duration: 0.4
  //         })
  //         .to(i.mesh.material.uniforms.uCorners.value, {
  //           y: 1,
  //           duration: 0.4
  //         }, 0.1)
  //         .to(i.mesh.material.uniforms.uCorners.value, {
  //           z: 1,
  //           duration: 0.4
  //         }, 0.2)
  //         .to(i.mesh.material.uniforms.uCorners.value, {
  //           w: 1,
  //           duration: 0.4
  //         }, 0.3)
  //     })
  //   })
  // }
  
  setupSettings() {
    this.settings = {
      progress: 0
    }
    this.gui = new dat.GUI();
    this.gui.add(this.settings, "progress", 0, 1, 0.001);
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.camera.fov = 2 * Math.atan((this.height / 2) / 600) * 180 / Math.PI;

    this.materials.forEach(m => {
      m.uniforms.uResolution.value.x = this.width;
      m.uniforms.uResolution.value.y = this.height;
    })

    this.imageStore.forEach(i => {
      let bounds = i.img.getBoundingClientRect();
      i.mesh.scale.set(bounds.width, bounds.height, 1);
      i.top = bounds.top;
      i.left = bounds.left + this.asscroll.currentPos;
      i.width = bounds.width;
      i.height = bounds.height;

      i.mesh.material.uniforms.uQuadSize.value.x = bounds.width;
      i.mesh.material.uniforms.uQuadSize.value.y = bounds.height;

      i.mesh.material.uniforms.uTextureSize.value.x = bounds.width;
      i.mesh.material.uniforms.uTextureSize.value.y = bounds.height;
    })
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        uProgress: { value: 0 },
        uTexture: { value: null },
        uTextureSize: { value: new THREE.Vector2(100, 100) },
        uCorners: { value: new THREE.Vector4(0, 0, 0, 0) },
        uResolution: { value: new THREE.Vector2(this.width, this.height) },
        uQuadSize: { value: new THREE.Vector2(300, 300) }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    // TODO: Can I remove mesh here? 👇
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(300, 300, 1)
    // this.scene.add( this.mesh );
    this.mesh.position.x = 300

    this.images = [...document.querySelectorAll('.article-image')];

    this.imageStore = this.images.map(img => {
      let bounds = img.getBoundingClientRect();
      let m = this.material.clone()
      this.materials.push(m);
      let texture = new THREE.Texture(img);
      texture.needsUpdate = true;

      m.uniforms.uTexture.value = texture;

      img.addEventListener('mouseover',() => {
        this.tl = gsap.timeline()
          .to(m.uniforms.uCorners.value,{ x:1, duration: 0.4 })
          .to(m.uniforms.uCorners.value,{ y:1, duration: 0.4 },0.1)
          .to(m.uniforms.uCorners.value,{ z:1, duration: 0.4 },0.2)
          .to(m.uniforms.uCorners.value,{ w:1, duration: 0.4 },0.3)
      })

      img.addEventListener('mouseout',() => {
        this.tl = gsap.timeline()
          .to(m.uniforms.uCorners.value,{ x:0, duration: 0.4 })
          .to(m.uniforms.uCorners.value,{ y:0, duration: 0.4 },0.1)
          .to(m.uniforms.uCorners.value,{ z:0, duration: 0.4 },0.2)
          .to(m.uniforms.uCorners.value,{ w:0, duration: 0.4 },0.3)
      })

      let mesh = new THREE.Mesh(this.geometry, m);
      this.scene.add(mesh);
      mesh.scale.set(bounds.width, bounds.height, 1);
      return {
        img: img,
        mesh: mesh,
        width: bounds.width,
        height: bounds.height,
        top: bounds.top,
        left: bounds.left,
      }
    })
  }

  setPosition() {
    if (!this.animationRunning) {
      this.imageStore.forEach(obj => {
        obj.mesh.position.x = obj.left - this.width / 2 + obj.width / 2;
        obj.mesh.position.y = this.asscroll.currentPos - obj.top + this.height / 2 - obj.height / 2;
      })
    }
  }

  render() {
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;

    this.asscroll.update()
    this.setPosition()
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this))
  }
}

new Sketch({
  domElement: document.getElementById('container_webgl')
});

