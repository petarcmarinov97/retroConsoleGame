import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import PausedGame from '../components/PausedGame';

describe('PausedGame tests', () => {

    let wrapper;
    const defaultStyle = {
        display: "none"
    }

    beforeEach(() => {
        wrapper = shallow(
            <PausedGame defaultStyle={defaultStyle} />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})