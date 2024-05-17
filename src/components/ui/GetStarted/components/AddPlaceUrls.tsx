import React, { useEffect, useState } from 'react';
import { Input } from '../../ShadcnComponents/input';
import { Label } from '../../ShadcnComponents/label';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../ShadcnComponents/button';
import { Cross1Icon } from '@radix-ui/react-icons';
export interface LinkInputType {
  id: string;
  value?: string;
}

interface AddPlaceUrlsProps {
  setPlaceUrl: (url: LinkInputType) => void;
  removePlaceUrl: (url: LinkInputType) => void;
  submit: (urls: LinkInputType | undefined) => void;
  providedLinks: LinkInputType[];
}

const AddPlaceUrls = ({
  setPlaceUrl,
  removePlaceUrl,
  submit,
  providedLinks,
}: AddPlaceUrlsProps) => {
  const initialPlaceLink: LinkInputType = {
    id: uuidv4(),
    value: undefined,
  };
  const [placeLinkInputs, setPlaceLinkInputs] = useState<LinkInputType[]>([
    initialPlaceLink,
  ]);

  const arePlacesAdded = (): boolean => {
    const updatedPlaceLinks = placeLinkInputs.filter((placeLink) =>
      Boolean(placeLink.value)
    );
    return updatedPlaceLinks.length > 0;
  };

  const handleOnInputChange = (linkId: string, placeLink: string) => {
    setPlaceLinkInputs((prevLinks) =>
      prevLinks.map((link) =>
        link.id === linkId
          ? { ...link, ...{ id: linkId, value: placeLink } }
          : link
      )
    );
  };

  const handleRemoveLink = (link: LinkInputType) => {
    const updatedPlaceLinks = placeLinkInputs.filter(
      (placeLink) => placeLink.id !== link.id
    );
    setPlaceLinkInputs(updatedPlaceLinks);
    removePlaceUrl(link);
  };

  const handleSubmit = () => {
    submit(
      providedLinks.length < placeLinkInputs.length
        ? placeLinkInputs[placeLinkInputs.length - 1]
        : undefined
    );
  };

  const handleAddLink = () => {
    if (placeLinkInputs.length >= 5) return;

    if (placeLinkInputs.length > 0)
      setPlaceUrl(placeLinkInputs[placeLinkInputs.length - 1]);

    const newLink: LinkInputType = {
      id: uuidv4(),
      value: undefined,
    };
    setPlaceLinkInputs((preValue) => [...preValue, newLink]);
  };

  useEffect(() => {
    if (placeLinkInputs.length === 1 && providedLinks.length > 0) {
      setPlaceLinkInputs(providedLinks);
    } else {
      setPlaceLinkInputs(placeLinkInputs);
    }
  }, [providedLinks]);

  return (
    <div className='flex flex-col justify-center items-center h-[100%] w-[90%] md:w-[40%] lg:w-[40%] xl:w-[40%] mx-auto z-20'>
      <p className='text-[36px] font-bold my-2'>Any Place In Mind?</p>
      <p className='text-[18px] mb-12'>
        Add the url of accomodations you are considering so far
      </p>
      {placeLinkInputs.map((link) => {
        return (
          <div
            key={link.id}
            className='grid grid-cols-4 items-center gap-4 mb-2 w-[100%]'
          >
            <Label htmlFor={link.id} className='sr-only'>
              Link
            </Label>
            <div className='flex flex-row items-center col-span-4'>
              <Input
                onChange={(event) =>
                  handleOnInputChange(link.id, event.target.value)
                }
                id={link.id}
                value={link.value}
              />
              <Cross1Icon
                onClick={() => handleRemoveLink(link)}
                className='ml-[8px] hover:cursor-pointer'
              />
            </div>
          </div>
        );
      })}

      <div
        onClick={handleAddLink}
        className={`flex justify-center items-center h-[40px] w-full col-span-4 rounded-md border border-dashed border-gray ${
          placeLinkInputs.length >= 5
            ? 'bg-gray-300 opacity-50'
            : 'bg-transparent'
        } text-[14px] mt-4 hover:cursor-pointer`}
      >
        Add
      </div>
      <Button
        disabled={!arePlacesAdded()}
        onClick={handleSubmit}
        className='w-[200px] mx-auto mt-8'
      >
        Submit
      </Button>
    </div>
  );
};

export default AddPlaceUrls;
