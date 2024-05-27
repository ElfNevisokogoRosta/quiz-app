import { FC, ReactNode, useEffect, useState } from 'react';
import BaseButton from '@/ui/BaseButton.tsx';
import { useParams } from 'react-router-dom';

interface ErrorsData {
  answers: { type: string, message: string, ref: HTMLFieldSetElement }[];
}

interface FormSliderProps {
  slides: ReactNode[];
  errors: ErrorsData | undefined;
}

const FormSlider: FC<FormSliderProps> = ({ slides, errors }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const params = useParams();
  useEffect(() => {
    setCurrentSlide(0);
  }, [params]);
  const onNextClick = () => {
    requestAnimationFrame(() => {
      setCurrentSlide(state => Math.min(state + 1, slides.length - 1));
    });
  };

  const onPreviousClick = () => {
    requestAnimationFrame(() => {
      setCurrentSlide(state => Math.max(state - 1, 0));
    });
  };

  const goToSlide = (id: number) => {
    setCurrentSlide(id);
  };

  const hasErrors = Array.isArray(errors?.answers);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={`index-${index * Math.random()}`} className="w-full flex-shrink-0 mx-auto">
            {hasErrors && errors?.answers[index] && (<span className="text-red-600">no answer chosen</span>)}
            {slide}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {currentSlide !== 0 && (
          <BaseButton type="button" onClick={onPreviousClick}>
            Previous
          </BaseButton>
        )}
        {currentSlide === slides.length - 1 ? (
          <BaseButton type="submit">Submit</BaseButton>
        ) : (
          <BaseButton type="button" className="ml-auto" onClick={onNextClick}>
            Next
          </BaseButton>
        )}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full cursor-pointer ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-400'} ${hasErrors && errors?.answers[index] ? 'bg-red-600' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FormSlider;
