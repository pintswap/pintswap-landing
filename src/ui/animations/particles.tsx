import React, { useCallback } from 'react';
import Particles from 'react-particles';
import type { Engine, Container } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

export function ParticlesContainer() {
  const customInit = useCallback(async (engine: Engine) => {
    try {
      await loadFull(engine);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      console.log('loaded', container);
    },
    []
  );

  return (
    <Particles
      id="tsparticles"
      init={customInit}
      loaded={particlesLoaded}
      options={
        // {
        //   particles: {
        //     number: {
        //       value: 160,
        //       density: {
        //         enable: true,
        //         value_area: 800
        //       }
        //     },
        //     color: {
        //       value: "#fff"
        //     },
        //     shape: {
        //       type: "circle",
        //       stroke: {
        //         width: 0,
        //         color: "#000000"
        //       },
        //       polygon: {
        //         nb_sides: 5
        //       },
        //       image: {
        //         src: "img/github.svg",
        //         width: 100,
        //         height: 100
        //       }
        //     },
        //     opacity: {
        //       value: 1,
        //       random: true,
        //       anim: {
        //         enable: true,
        //         speed: 1,
        //         opacity_min: 0,
        //         sync: false
        //       }
        //     },
        //     size: {
        //       value: 3,
        //       random: true,
        //       anim: {
        //         enable: false,
        //         speed: 4,
        //         size_min: 0.3,
        //         sync: false
        //       }
        //     },
        //     line_linked: {
        //       enable: false,
        //       distance: 150,
        //       color: "#000",
        //       opacity: 0.4,
        //       width: 1
        //     },
        //     move: {
        //       enable: true,
        //       speed: 1,
        //       direction: "none",
        //       random: true,
        //       straight: false,
        //       out_mode: "out",
        //       bounce: false,
        //       attract: {
        //         enable: false,
        //         rotateX: 600,
        //         rotateY: 600
        //       }
        //     }
        //   },
        //   interactivity: {
        //     detect_on: "canvas",
        //     events: {
        //       resize: true
        //     },
        //     modes: {
        //       grab: {
        //         distance: 400,
        //         line_linked: {
        //           opacity: 1
        //         }
        //       },
        //       bubble: {
        //         distance: 250,
        //         size: 0,
        //         duration: 2,
        //         opacity: 0,
        //         speed: 3
        //       },
        //       repulse: {
        //         distance: 400,
        //         duration: 0.4
        //       },
        //       push: {
        //         particles_nb: 4
        //       },
        //       remove: {
        //         particles_nb: 2
        //       }
        //     }
        //   },
        //   retina_detect: true
        // }
        {
          particles: {
            number: {
              value: 200,
            },
            color: {
              value: '#344455',
              animation: {
                enable: true,
                speed: 20,
                sync: false,
              },
            },
            shape: {
              type: 'image',
              options: {
                image: [
                  {
                    src: 'https://cdn130.picsart.com/262323691001212.png?r1024x1024',
                    width: 202,
                    height: 200,
                  },
                  {
                    src: 'http://pngimg.com/uploads/soap_bubbles/soap_bubbles_PNG72.png',
                    width: 1153,
                    height: 1080,
                  },
                  {
                    src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/54e847be-8444-4485-9d2f-0d51a9ab6b3f/dcruv7h-9c57c565-e380-4d20-9413-d743c35c83a4.png/v1/fill/w_894,h_894,strp/transparent_rainbow_bubble_prop_png_3_by_lxc808_dcruv7h-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzU0ZTg0N2JlLTg0NDQtNDQ4NS05ZDJmLTBkNTFhOWFiNmIzZlwvZGNydXY3aC05YzU3YzU2NS1lMzgwLTRkMjAtOTQxMy1kNzQzYzM1YzgzYTQucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.laWMbla12KsLhf1aJHcWGzVyHxfciBK84P_uzOZSKTs',
                    width: 894,
                    height: 894,
                  },
                ],
              },
            },
            size: {
              value: 6,
              random: true,
              animation: {
                enable: true,
                speed: 20,
                minimumValue: 0.1,
                sync: false,
              },
            },
          },
        }
      }
    />
  );
}
