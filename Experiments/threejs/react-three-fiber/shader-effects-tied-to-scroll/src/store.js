import { createRef } from "react"

const state = {
  sections: 9,
  pages: 8.5,
  zoom: 75,
  paragraphs: [
    {
      offset: 1,
      factor: 1.75,
      header: "District 4",
      image: "/assets/defender.jpg",
      aspect: 1.8,
      text: "Two thousand pharmacologists and bio-chemists were subsidized. Six years later it was being produced commercially."
    },
    {
      offset: 2,
      factor: 2.0,
      header: "Diamond Road",
      image: "/assets/above.jpg",
      aspect: 1.5,
      text:
        "The man who comes back through the Door in the Wall will never be quite the same as the man who went out. He will be wiser but less sure, happier but less self-satisfied, humbler in acknowledging his ignorance yet better equipped to understand the relationship of words to things, of systematic reasoning to the unfathomable mystery which it tries, forever vainly, to comprehend."
    },
    {
      offset: 3,
      factor: 2.25,
      header: "Catalina",
      image: "/assets/discovery.jpg",
      aspect: 1.5,
      text:
        "The substance can take you to heaven but it can also take you to hell. Or else to both, together or alternately. Or else (if you're lucky, or if you've made yourself ready) beyond either of them. And then beyond the beyond, back to where you started from — back to here, back to New Rotham sted, back to business as usual. Only now, of course, business as usual is completely different."
    },
    {
      offset: 4,
      factor: 2.0,
      header: "Building 21",
      image: "/assets/forest.jpg",
      aspect: 1.5,
      text:
        "We’ve found that the people whose EEG doesn’t show any alpha-wave activity when they’re relaxed aren’t likely to respond significantly to the substance. That means that, for about fifteen percent of the population, we have to find other approaches to liberation."
    },
    {
      offset: 5,
      factor: 1.75,
      header: "Sector 8",
      image: "/assets/lookout.jpg",
      aspect: 1.5,
      text:
        "By cultivating the state of mind that makes it possible for the dazzling ecstatic insights to become permanent and habitual illuminations. By getting to know oneself to the point where one won’t be compelled by one’s unconscious to do all the ugly, absurd, self-stultifying things that one so often finds oneself doing."
    },
    { offset: 7, 
      factor: 1.05, 
      header: "The Factory", 
      image: "/assets/seabreeze.jpg", 
      aspect: 1.5, 
      text: "Education and enlightenment." 
    }
  ],
  stripes: [
    { offset: 0, color: "#000", height: 13 },
    { offset: 6.3, color: "#000", height: 20 }
  ],
  top: createRef()
}

export default state
