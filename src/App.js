import "./styles.css";
import BeforeAfterSlider from "./BeforeAfterSlider";
// import beforeImage from "./path-to-before-image.jpg";
// import afterImage from "./path-to-after-image.jpg";

export default function App() {
  return (
    <div className="App">
      <h1>Before/After Slider</h1>
      <BeforeAfterSlider
        beforeImage={
          "https://moxiebeauty.in/cdn/shop/files/2B_Before_FF_87b6b55c-b8d2-4d91-b366-7bb5a271e994.webp?v=1719314822&width=800"
        }
        afterImage={
          "https://moxiebeauty.in/cdn/shop/files/2BAfter_FF.webp?v=1719314821&width=800"
        }
      />
    </div>
  );
}
