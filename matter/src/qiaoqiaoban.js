import './css/app.css';
import Matter from "matter-js";
import $ from "jquery";

let Constraint=Matter.Constraint,
    World=Matter.World,
    Engine=Matter.Engine,
    Render=Matter.Render,
    Bodies=Matter.Bodies,
    MouseConstraint=Matter.MouseConstraint,
    Composites=Matter.Composites;

let engine=Engine.create();

var render=Render.create({
    engine:engine,
    element:document.body,
    options:{
        width:$(window).width(),
        height:$(window).width(),
        wireframes:false
    }
});

Engine.run(engine);
Render.run(render);

let rectA=Bodies.rectangle(400,$(window).height()-100,40,200,{
    isStatic : true,
    render : {
        fillStyle : "#f00"
    },
    collisionFilter : {
        group : -1
    }
})

let rectB=Bodies.rectangle(400,$(window).height()-180,400,40,{
    render : {
        fillStyle : "#00f"
    },
    collisionFilter : {
        group : -1
    }
})

let ballA=Bodies.circle(300,100,30,{
    render : {
        fillStyle : 'red'
    }
})

var rotate=Constraint.create({
    bodyA:rectA,
    bodyB:rectB,
    pointA:{x:0,y:-80},
    length:1,
    stiffness:0.6
})

var mouseConstraint=MouseConstraint.create(engine,{
    element:document.body
});

World.add(engine.world,[rectA,rectB,ballA,mouseConstraint,rotate]);