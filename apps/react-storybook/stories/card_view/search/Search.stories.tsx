import type {Meta, StoryObj} from "@storybook/react";
import {wrapDxWithReact} from "../../utils";
import dxCardView from "devextreme/ui/card_view";

const CardView = wrapDxWithReact(dxCardView);

const DATA = [{
    id: 1,
    firstName: 'Darin',
    lastName: 'Heritege',
    email: 'dheritege0@jugem.jp',
    gender: 'Male',
}, {
    id: 2,
    firstName: 'Aeriel',
    lastName: 'Giggs',
    email: 'agiggs1@hubpages.com',
    gender: 'Female',
}, {
    id: 3,
    firstName: 'Theo',
    lastName: 'Aleksidze',
    email: 'taleksidze2@patch.com',
    gender: 'Female',
}, {
    id: 4,
    firstName: 'Dalli',
    lastName: 'Ashwood',
    email: 'dashwood3@buzzfeed.com',
    gender: 'Male',
}, {
    id: 5,
    firstName: 'Paule',
    lastName: 'Pidgeley',
    email: 'ppidgeley4@upenn.edu',
    gender: 'Female',
}];

const meta: Meta<typeof CardView> = {
    title: "Grids/CardView/Search",
    component: CardView,
    argTypes: {
        searchPanel: {
            control: 'object',
        }
    }
};

export default meta;

type Story = StoryObj<typeof CardView>;

export const DefaultMode: Story = {
    args: {
        dataSource: DATA,
        width: "100%",
        height: '500px',
        cardsPerRow: "auto",
        cardMinWidth: 250,
        cardMaxWidth: 350,
        searchPanel: {

        }
    },
};
