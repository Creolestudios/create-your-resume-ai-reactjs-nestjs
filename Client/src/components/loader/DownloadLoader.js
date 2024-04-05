import React, { useEffect, useState } from 'react';
import gif from '../download/images/download_gif.gif';
import stick from '../download/images/Rectangle7.svg';

function DownloadLoader() {
  const [listToShow, setListToShow] = useState(null);

  useEffect(() => {
    const randomListNumber = Math.random() < 0.5 ? 'list-1' : 'list-2';
    setListToShow(randomListNumber);
  }, []);

  const renderList = () => {
    if (listToShow === 'list-1') {
      return (
        <>
          <li>
            Sloths are the reigning champions of slowness, moving at a speed
            that makes a snail look like an Olympic sprinter.0.15 mph (0.24
            km/h)
          </li>

          <li>
            These tree huggers are devout homebodies, avoiding the ground like
            it's lava.
          </li>

          <li>
            These tree huggers are devout homebodies, avoiding the ground like
            it's lava.
          </li>

          <li>
            Sloths digest food at a pace that puts even the slowest eaters to
            shame, taking up to a month to process a single meal.
          </li>

          <li>
            When it comes to toes, sloths are either team two or team three,
            with a confusing finger situation on the side.
          </li>

          <li>
            Despite their lazy image, these creatures are undercover night owls,
            saving their energy for some wild treehouse parties.
          </li>
        </>
      );
    } else if (listToShow === 'list-2') {
      return (
        <>
          <li>
            Sloths are nap champions, beating even hibernating bears in snooze
            time.
          </li>

          <li>
            Surprise! Sloths can swim, giving Michael Phelps a run for his
            money.
          </li>

          <li>
            Their fur is a bustling ecosystem, hosting a bustling community of
            algae and bugs.
          </li>

          <li>
            During mating season, they turn into the jungle's loudest crooners,
            hitting high notes that rival any opera singer.
          </li>

          <li>
            Sadly, these slowpokes are in a housing crisis, looking for a
            quieter neighborhood away from human hubbub.
          </li>
        </>
      );
    }
    return null; // In case listToShow is neither 'list-1' nor 'list-2'
  };
  return (
    <>
      <div className='download-loader'>
        <p id='loader-heading'>Fun facts about sloths while you wait?</p>

        <ul className='loading-points'>{renderList()}</ul>

        <div className='sloth-gif'>
          <img src={gif} alt='sloth' className='img1' />
        </div>
      </div>
    </>
  );
}

export default DownloadLoader;
