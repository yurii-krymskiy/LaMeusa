import GallerySlider from "../components/features/GallerySlider";
import ScrollCircle from "../components/features/ScrollCircle";
import CustomBlueButton from "../components/ui/CustomBlueButton";
import CutomBorderButton from "../components/ui/CutomBorderButton";

const Home = () => {
  return (
    <>
      <section className="bg-[url('/images/home-bg.png')] h-[640px] bg-cover bg-no-repeat flex flex-col items-center justify-between pt-15 pb-10">
        <div className="flex flex-col max-w-[60vw] items-center">
          <h1 className="title text-white text-[64px] text-center font-[500] mb-5">
            A Morning by the Ocean, A Dinner with Elegance
          </h1>
          <p className="simple-text text-white text-center mb-10">
            Experience the taste of Mediterranean cuisine against the backdrop of the Atlantic Ocean. At La Medusa, we create an atmosphere where every moment is a pleasure and every dish is a story.
          </p>
          <CutomBorderButton
            variant="white"
            className="w-[200px] h-[60px]"
            text="Book Now"
          />
        </div>
        <ScrollCircle />
      </section>
      <section className="py-15 bg-[#F9F9F9]">
        <div className="flex flex-row gap-15 max-w-[1400px] mx-auto">
          <img src="/images/header/image-3.png" alt="Image" className="h-[695px] object-cover w-[40%]" />
          <div className="flex flex-col justify-between items-start w-[60%]">
            <div className="flex flex-col">
              <p className="decorative text-[34px] mb-2.5">
                Our Menu
              </p>
              <p className="title text-[48px] mb-6">
                Discover Our Menu
              </p>
              <p className="simple-text mb-2.5">
                Each of our dishes is a sophisticated combination of fresh ingredients, ocean freshness and unique flavors. Discover the menu, created with love and inspiration, and let it inspire you.
              </p>
              <p className="simple-text mb-10">
                Our chefs create dishes from the freshest ingredients. The basis is Mediterranean tradition with an original accent.
              </p>
              <CustomBlueButton
                text="View Menu"
                className="w-[200px] h-[60px]"
              />
            </div>
            <div className="flex flex-row gap-2 w-full">
              <img src="/images/header/image-6.png" alt="img" className="w-full h-[160px] object-cover" />
              <img src="/images/header/image-7.png" alt="img" className="w-full h-[160px] object-cover" />
              <img src="/images/header/image-8.png" alt="img" className="w-full h-[160px] object-cover" />
              <img src="/images/header/image-9.png" alt="img" className="w-full h-[160px] object-cover" />
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-[1400px] mx-auto">
        <section className="py-15 flex flex-col items-center">
          <img src="/icons/star.svg" alt="star" className="w-[22px] h-[22px]" />
          <p className="title text-[48px] my-6">
            Every dish tells a story
          </p>
          <p className="simple-text text-center mb-9">
            At La Medusa, every ingredient, every flavor is a grateful embodiment of Mediterranean<br /> tradition. Our chefs strive for each dish to be not just food, but an emotion that stays with you.
          </p>
          <div className="flex flex-row h-[320px] items-start w-full gap-10">
            <img src="/images/header/image-1.png" alt="image" className="w-full h-[268px] object-cover" />
            <img src="/images/header/image-2.png" alt="image" className="w-full h-[320px] object-cover" />
            <img src="/images/header/image-5.png" alt="image" className="w-full h-[240px] object-cover self-end" />
            <img src="/images/header/image-4.png" alt="image" className="w-full h-[268px] object-cover" />
          </div>
        </section>
        <section className="flex flex-row gap-15 py-15">
          <div className="flex flex-col justify-between w-[50%]">
            <div className="flex flex-col">
              <p className="decorative text-[34px]">About Us</p>
              <p className="title text-[48px]">
                The Spirit of
                <br />
                La Medusa
              </p>
              <p className="simple-text mt-6">
                La Medusa is more than a restaurant. It is a place where the ocean meets elegance: views of the waves, service with soul, and an atmosphere that invites you to linger.
              </p>
              <p className="simple-text mt-4">
                At La Medusa, everything is important: from the way the light falls on the tables to the music played in the evening. We strive to make every guest feel like they are not just a visitor, but part of the restaurant's history.
              </p>
            </div>
            <CutomBorderButton
              variant="blue"
              text="Learn More"
              className="w-[200px] h-[60px]"
            />
          </div>
          <img src="/images/header/image-10.png" alt="image" className="w-[50%] h-[510px] object-cover" />
        </section>
      </div>
      <section className="flex flex-col items-center py-15">
        <p className="decorative text-[34px] text-center">
          Our Gallery
        </p>
        <p className="title text-[48px] text-center my-6">
          Gallery of the restaurant
        </p>
        <p className="simple-text text-center mb-10">
          Take a peek into our heart - browse the gallery and get a feel for La Medusa<br /> before you visit. From the interior to the food, every frame tells a story.
        </p>
        <GallerySlider />
      </section>
      <div className="max-w-[1400px] mx-auto">
        <section className="my-15 flex flex-row items-start h-[734px] gap-6">
          <img src="/images/header/image-11.png" alt="image" className="w-[20%] h-[536px] object-cover self-start" />
          <div className="flex flex-col w-[20%] self-end h-fit gap-6">
            <img src="/images/header/image-12.png" alt="image" className="w-[100%] h-[271px] object-cover" />
            <img src="/images/header/image-13.png" alt="image" className="w-[100%] h-[382px] object-cover" />
          </div>
          <div className="self-center w-[60%]">
            <p className="decorative text-[34px] mb-2.5">
              Food Story
            </p>
            <p className="title text-[48px] mb-6">
              Fresh Ingredients, Authentic Taste
            </p>
            <p className="simple-text mb-2.5">
              Sea, sun and soul - all this in every plate. We prefer local and fresh products, combined with delicate execution: this is the path to true taste.
            </p>
            <p className="simple-text mb-2.5">
              Our dishes combine simplicity and sophistication, because the main thing is to preserve the true taste of the products.
            </p>
            <p className="simple-text">
              In each plate you will find harmony: the tenderness of textures, the brightness of colors, and the strength of aroma.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
