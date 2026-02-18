"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null;
    }

    return (
        <div className="fixed inset-0 -z-10">
            <Particles
                id="tsparticles"
                options={{
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            resize: {
                                enable: true,
                                delay: 0.5
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "out",
                            },
                            random: true,
                            speed: 0.1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 150,
                        },
                        opacity: {
                            animation: {
                                enable: true,
                                speed: 1,
                                sync: false,
                            },
                            value: { min: 0.1, max: 0.5 },
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                    emitters: {
                        direction: "none",
                        life: {
                            count: 0,
                            duration: 0.1,
                            delay: 0.1,
                        },
                        rate: {
                            delay: 7,
                            quantity: 1,
                        },
                        size: {
                            width: 0,
                            height: 0,
                        },
                        position: {
                            x: 50,
                            y: 50,
                        },
                        particles: {
                            color: {
                                value: "#ffffff"
                            },
                            move: {
                                direction: "top-right",
                                enable: true,
                                outModes: {
                                    default: "out",
                                    top: "destroy",
                                    left: "destroy",
                                    right: "destroy",
                                    bottom: "destroy"
                                },
                                random: false,
                                speed: 50,
                                straight: true,
                            },
                            rotate: {
                                value: {
                                    min: 0,
                                    max: 360,
                                },
                                animation: {
                                    enable: true,
                                    speed: 0,
                                    sync: false
                                }
                            },
                            opacity: {
                                value: 1
                            },
                            shape: {
                                type: "line",
                            },
                            size: {
                                value: { min: 1, max: 2 },
                            },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
};

export default ParticlesBackground;
