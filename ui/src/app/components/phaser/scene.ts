export class MainScene extends Phaser.Scene {

    private group;
    private tween;
    private div;

    constructor(el: HTMLElement) {
        super({ key: 'main' });
        this.div = el;
    }
    create() {
        const circle = new Phaser.Geom.Circle(400, 300, 260);

        this.group = this.add.group({
            key: 'ball', frameQuantity: 32
        } as Phaser.Types.GameObjects.Group.GroupConfig);

        Phaser.Actions.PlaceOnCircle(this.group.getChildren(), circle);

        this.tween = this.tweens.addCounter({
            from: 160,
            to: 10,
            duration: 3000,
            delay: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        const element = this.add.dom(400, 300, this.div);
        //element.setPerspective(800);
        // element.rotate3d.set(1, 0, 0, 0);
        element.rotate3d.set(0, 1, -10000, 0);
        element.x = 200;

        this.tweens.add({
            targets: element.rotate3d,
            x: 5,
            y: 5,
            w: 800,
            z: -1000,
            duration: 3000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });
    }
    preload() {
        this.load.image('ball', '/assets/alt.png');
    }
    update() {
        Phaser.Actions.RotateAroundDistance(this.group.getChildren(), { x: 400, y: 300 }, 0.02, this.tween.getValue());
    }
}