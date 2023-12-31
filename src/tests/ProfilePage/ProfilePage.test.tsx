import React from "react";
import {render} from "@testing-library/react";
import {useAuth0} from "@auth0/auth0-react";
import {ProfilePage} from "../../components/ProfilePage/ProfilePage";

jest.mock("@auth0/auth0-react");

describe("ProfilePage", () => {
    it("does not render profile information when user is not authenticated", () => {
        // arrange
        (useAuth0 as jest.Mock).mockReturnValueOnce({ user: null });

        // act
        const {container} = render(<ProfilePage />);

        // assert
        expect(container.firstChild).toBeNull();
    });

    it("renders profile information when user is authenticated", () => {
        // arrange
        const mockUser = {
            email: "test@example.com",
            picture: "user-picture-url"
        };

        (useAuth0 as jest.Mock).mockReturnValueOnce({user: mockUser});

        // act
        const {getByText, getByAltText} = render(<ProfilePage />);

        const profileHeading = getByText("Profile Page");
        const userEmail = getByText("test@example.com");
        const userPicture = getByAltText("user icon consisting of first two letters of name");

        // assert
        expect(profileHeading).toBeInTheDocument();
        expect(userEmail).toBeInTheDocument();
        expect(userPicture).toHaveAttribute("src", "user-picture-url");
    })
})