import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(Draggable, DrawSVGPlugin, ScrollTrigger, SplitText)

ScrollTrigger.config({ ignoreMobileResize: true })

// window.addEventListener('bodyResize', ScrollTrigger.refresh)
