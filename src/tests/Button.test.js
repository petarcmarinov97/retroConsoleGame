import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import Button from "../components/Button";

const btn = {
    style: {
        "border": "1px solid #000",
        "borderColor": "transparent",
        "boxShadow": "0px 0px 2px 1px rgb(255 255 255 / 60%) inset",
        "visibility": "unset",
    },
    size: "large",
    shape: "circle",
    btnkey: 37,
}

describe('Button tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Button
                className={btn.className}
                style={btn.style}
                size={btn.size}
                shape={btn.shape}
                btnkey={btn.btnkey}
            />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})
