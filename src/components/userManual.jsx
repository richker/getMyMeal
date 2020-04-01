import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";
import pic1 from "../img/userManual/1.jpeg";
import pic2 from "../img/userManual/2.jpeg";
import pic3 from "../img/userManual/3.jpeg";
import pic4 from "../img/userManual/4.jpeg";
import pic5 from "../img/userManual/5.jpeg";
import pic6 from "../img/userManual/6.jpeg";
import pic7 from "../img/userManual/7.jpeg";
import pic8 from "../img/userManual/8.jpeg";
import pic9 from "../img/userManual/9.jpeg";
import pic10 from "../img/userManual/10.jpeg";
import pic11 from "../img/userManual/11.jpeg";
import pic12 from "../img/userManual/12.jpeg";

const items = [
  {
    src: pic1,
    altText: "Slide 1"
  },
  {
    src: pic2,
    altText: "Slide 2"
  },
  {
    src: pic3,
    altText: "Slide 3"
  },
  {
    src: pic4,
    altText: "Slide 4"
  },
  {
    src: pic5,
    altText: "Slide 5"
  },
  {
    src: pic6,
    altText: "Slide 6"
  },
  {
    src: pic7,
    altText: "Slide 7"
  },
  {
    src: pic8,
    altText: "Slide 8"
  },
  {
    src: pic9,
    altText: "Slide 9"
  },
  {
    src: pic10,
    altText: "Slide 10"
  },
  {
    src: pic11,
    altText: "Slide 11"
  },
  {
    src: pic12,
    altText: "Slide 12"
  }
];

class UserManual extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} width="750" height="450" />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}

export default UserManual;
