import React from 'react';
import Carousel from 'react-material-ui-carousel'

interface Props {
    childs?: [...[React.ReactElement]]
}
const CarouselComponent = (props:Props) => {
    const childs = props.childs??[]

    return (
        <Carousel next={ (next, active) => console
            .log(`we left ${active}, and are now at ${next}`) }
                  prev={ (prev, active) => console
                      .log(`we left ${active}, and are now at ${prev}`) }
                  sx={{width: '30%'}}
        >
            {
                childs.map( (x) => x )
            }
        </Carousel>
    )
}

export default CarouselComponent
