"use client";

import { useRef, useEffect } from "react";
import { Engine, Render, Runner, Bodies, Composite } from "matter-js";

const HomePage = () => {
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!testRef.current) return;
    const engine = Engine.create();

    const render = Render.create({
      element: testRef.current,
      engine: engine,
    });

    const boxA = Bodies.rectangle(400, 200, 80, 80);
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    Composite.add(engine.world, [boxA, boxB, ground]);
    Render.run(render);

    const runner = Runner.create();

    Runner.run(runner, engine);
  }, []);

  return (
    <main>
      <section className="h-screen">
        <h1>{"I'm Masashi Konno"}</h1>
        <div ref={testRef}></div>
      </section>
    </main>
  );
};

export default HomePage;
