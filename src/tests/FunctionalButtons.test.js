import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from "enzyme-to-json";
import FunctionalButtons from '../components/FunctionalButtons';

describe('FunctionalButtons tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <FunctionalButtons />);
    })

    describe('Snapshots', () => {
        it("should render correctly", () => {
            expect(shallowToJson(wrapper)).toMatchSnapshot();
        })
    })
})