import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import ArrowButtons from '../components/ArrowButtons';

describe('ArrowButtons tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <ArrowButtons/>);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})
