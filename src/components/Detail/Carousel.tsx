import { useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IprojectImgs } from "../../interfaces/IPost";

type Props = { images: IprojectImgs[] };

const Carousel = ({ images }: Props) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const sliding = (newSlideIndex: number) => {
    if (slideRef?.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${newSlideIndex * 100}%)`;
    }
    setCurrentSlide(newSlideIndex);
  };

  const handlePrevClick = () => {
    const newSlideIndex =
      currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    sliding(newSlideIndex);
  };

  const handleNextClick = () => {
    const newSlideIndex =
      currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    sliding(newSlideIndex);
  };

  return (
    <CarouselContainer>
      <CarouselTrack ref={slideRef}>
        {images.map((image: IprojectImgs, index) => (
          <img key={index} src={image.src} alt={image.alt} />
        ))}
      </CarouselTrack>
      <CarouselPrev onClick={handlePrevClick}>
        <IoIosArrowBack />
      </CarouselPrev>
      <CarouselNext onClick={handleNextClick}>
        <IoIosArrowForward />
      </CarouselNext>
    </CarouselContainer>
  );
};
export default Carousel;

const CarouselContainer = styled.div`
  min-height: 20rem;
  flex-grow: 3;
  width: 100%;
  background-color: white;

  overflow: hidden;
  position: relative;
`;
const CarouselTrack = styled.div`
  display: flex;
  width: 100%;
  max-height: 30rem;

  & > img {
    min-width: 100%;
    object-fit: contain;
  }
`;
const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
`;

const CarouselPrev = styled(CarouselButton)`
  left: 10px;
`;
const CarouselNext = styled(CarouselButton)`
  right: 10px;
`;
