import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as Page from "./page";

const MainRoutes = () => (
  <Routes>
    {/** Protected Routes */}

    <Route path="/" element={<Page.ProtectedRoutes />}>
      <Route element={<Page.Layout />}>
        <Route path="/" element={<Navigate replace to="missions" />} />
        <Route path="PageCv" element={<Page.PageCv />} />
        <Route path="jobs" element={<Page.Jobs />} />
        <Route path="devis" element={<Page.Devis />} />
        <Route path="clients" element={<Page.Clients />} />
        <Route path="gestion" element={<Page.Gestion />} />
        <Route path="profile" element={<Page.Profile />} />
        <Route path="missions" element={<Page.Missions />} />
        <Route path="parametre" element={<Page.Parametre />} />
        <Route path="dashboard" element={<Page.Dashboard />} />
        <Route path="jobs/Add Job" element={<Page.AddJob />} />
        <Route path="abonnement" element={<Page.Abonnement />} />
        <Route path="recruitment" element={<Page.Recruitment />} />
        <Route path="utilisateurs" element={<Page.Utilisateurs />} />
        <Route path="fournisseurs" element={<Page.Fournisseurs />} />
        <Route path="jobs/Update Job/:id" element={<Page.UpdateJob />} />
        <Route
          path="VisualiserCvClient/:id"
          element={<Page.VisualiserCvClient />}
        />
        <Route
          path="VisualiserCvFournisseur/:id"
          element={<Page.VisualiserCvProvider />}
        />
      </Route>
    </Route>

    {/** Public Routes */}

    <Route path="register" element={<Page.PublicRoutes />}>
      <Route path="/register" element={<Page.Register />} />
    </Route>
    <Route path="login" element={<Page.PublicRoutes />}>
      <Route path="/login" element={<Page.Login />} />
    </Route>

      <Route path="/denied" element={<Page.NoPermission />} />

    {/** Permission denied route */}
  </Routes>
);

export default MainRoutes;
