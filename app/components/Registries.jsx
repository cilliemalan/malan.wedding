import React from 'react';

const registries = {
    boardmans: {
        image: require('../content/boardmans.png'),
        title: 'Boardmans',
        href: 'https://www.boardmans.co.za/giftregistry/view/index/id/RW000023370/'
    }, mrphome: {
        image: require('../content/mrphome.png'),
        title: 'Mr. Price Home',
        href: 'https://www.mrphome.com/en_za/giftregistry/view/index/id/MAL000042/eid/9534/'
    }, yuppiechef: {
        image: require('../content/yuppiechef.png'),
        title: 'Yuppiechef',
        href: 'https://www.yuppiechef.com/registry.htm?action=view&orderid=2635829'
    }
};

export const Registries = (props) =>
    <div id="registries">
        <h1>Registries</h1>
        <ul>
            {Object.keys(registries).map(k =>
                <li key={k}>
                    <a href={registries[k].href} target='_blank'>
                        <img src={registries[k].image} alt={registries[k].title} />
                    </a>
                </li>)}
        </ul>
    </div>