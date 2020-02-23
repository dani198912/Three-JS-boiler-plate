function GLManager(data) {

    this.totalEntries = data.length;
    this.loadedEntries = 0;

    //Deifining Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
    camera.position.z = 5;
    //Defining Scene
    const scene = new THREE.Scene();
    camera.lookAt = scene.position;

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    this.render = this.render.bind(this);
    this.textures = data.map((entry, i) =>
        new THREE.TextureLoader().load(
            entry.image,
            this.calculateAspectRationFactor.bind(this, i)
        )
    );

    this.factors = data.map(d => new THREE.Vector2(1, 1));
    this.currentIndex = 0;
    this.nextIndex = 0;
    this.textureProgress = 0;
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.initialRender = false;
    this.time = 0;
    this.loopRaf = null;
    this.loop = this.loop.bind(this);

}

GLManager.prototype.getViewSize = function () {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const viewSize = Math.abs(
        this.camera.position.z * Math.tan(fovInRadians / 2) * 2
    );

    return viewSize;
};

GLManager.prototype.getPlaneSize = function () {
    const viewSize = this.getViewSize();
    return {
        width: viewSize * 1.5,
        height: viewSize
    };
};