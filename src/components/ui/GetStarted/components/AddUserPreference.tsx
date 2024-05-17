import { SamplePropmt } from '@/types/place_types';
import React, { useEffect, useState } from 'react';
import { Button } from '../../ShadcnComponents/button';
import { Textarea } from '../../ShadcnComponents/textarea';
import { motion } from 'framer-motion';
import { divVariants } from './PlaceDescriptionCard';

const AddUserPreference = ({
  setUserPref,
  value,
}: {
  setUserPref: (pref: string | undefined) => void;
  value: string | undefined;
}) => {
  const [preference, setPreference] = useState<string | undefined>(undefined);
  const [hoveredCardId, setHoveredCardId] = useState<string | undefined>(
    undefined
  );

  const handleContinue = () => {
    if (!preference) return;

    setUserPref(preference);
  };

  useEffect(() => {
    setPreference(value);
  }, []);
  return (
    <div className='flex flex-col justify-center items-center w-[80%] md:w-[50%] lg:w-[50%] xl:w-[50%] h-[100%] mx-auto z-20'>
      <p className='text-[36px] font-bold my-2'>Review Spark</p>
      <p className='text-[18px] mb-4'>
        What is your ideal place to visist? Share with us your preferences.
      </p>
      <Textarea
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setPreference(event.target.value)
        }
        value={preference}
        className='my-4'
      />
      <Button
        disabled={!Boolean(preference)}
        onClick={handleContinue}
        className='w-[200px] my-2'
      >
        Continue
      </Button>
      <div className='flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2'>
        {samplePrompts.map((samplePrompt) => {
          return (
            <motion.div
              key={samplePrompt.id}
              initial={false}
              variants={divVariants}
              animate={[hoveredCardId === samplePrompt.id ? 'hover' : 'rest']}
              onHoverStart={() => setHoveredCardId(samplePrompt.id)}
              onHoverEnd={() => setHoveredCardId(undefined)}
              className='flex flex-col justify-start m-2 shadow-md rounded-md bg-white hover:cursor-pointer'
            >
              <div
                onClick={() => {
                  setPreference(samplePrompt.prompt);
                }}
                className='flex justify-center items-center h-[140px] w-[260px] rounded-md border border-gray p-4'
              >
                {samplePrompt.prompt}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const samplePrompts: SamplePropmt[] = [
  {
    id: 'sp-1',
    prompt:
      'I want a place with more space in the rooms. I want the windows face to a sun rise',
  },
  { id: 'sp-2', prompt: 'I want a hotel for family of big size' },
  { id: 'sp-3', prompt: 'I want a restaurant that has a live band every day' },
  {
    id: 'sp-4',
    prompt: 'I want a hotel with nice spa and excellent room service',
  },
];

export default AddUserPreference;
