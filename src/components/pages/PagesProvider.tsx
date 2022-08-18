import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Navbar, {PageProp} from "../navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import CookBookPage from "../../pages/project/CookBookPage";
import MCListPage from "../../pages/project/MCListPage";
import TwitchPage from "../../pages/project/TwitchPage";
import TravelListPage from "../../pages/project/TravelListPage";
import TrafficLightPage from "../../pages/project/TrafficLightPage";
import AdminPanelPage from "../../pages/project/admin-panel/AdminPanelPage";
import NotFoundPage from "../../pages/abstract/NotFoundPage";
import styled from "styled-components";
import ProfilePage from "../../pages/project/ProfilePage";
import ProfileSettingsPage from "../../pages/project/ProfileSettingsPage";
import RedirectPage from "../../pages/abstract/RedirectPage";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";

const PagesProvider = () => {
    const [pages, setPages] = useState<PageProp[]>([]);
    const [isPending, setIsPending] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get(`/api/users/pages`)
            .then(res => {
                setPages(res.data.data);
                setIsPending(false);
            })
    }, [axiosPrivate])

    const PageComponents: any = {
        "CookBookPage": CookBookPage,
        "MCListPage": MCListPage,
        "TwitchPage": TwitchPage,
        "TravelListPage": TravelListPage,
        "TrafficLightPage": TrafficLightPage,
        "AdminPanelPage": AdminPanelPage
    };

    return (
        <>
            <Navbar pages={pages} />
            {isPending
                ?
                <LoadingSpinner />
                :
                <Container>
                    <ContentWrapper>
                        <Routes>
                            {pages.map((page, index) => {
                                const PageElement = React.createElement(PageComponents[page.component_name]);
                                return (
                                    <Route key={index} path={page.path} element={PageElement} />
                                )
                            })}
                            {pages.length > 0 &&
                                <Route path="/"  element={<RedirectPage path={pages[0].path} />} />
                            }
                            <Route path="/profile"  element={<ProfilePage />} />
                            <Route path="/profile-settings"  element={<ProfileSettingsPage />} />
                            <Route path="*"  element={<NotFoundPage />} />
                        </Routes>
                    </ContentWrapper>
                </Container>
            }
        </>
    );
};

export default PagesProvider;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 90em;
  width: 100%;
  flex: 1 1 auto;
`
