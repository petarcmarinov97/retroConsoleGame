import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import LastGameStats from '../components/LastGameStats';

describe('LastGameStats tests', () => {

    let wrapper;
    const defaultStyle = {
        display: "none"
    }
    
    beforeEach(() => {
        wrapper = shallow(
            <LastGameStats defaultStyle={defaultStyle} />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})