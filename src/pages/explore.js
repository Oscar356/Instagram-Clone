import React from "react";
import Layout from "../components/shared/Layout";
import ExploreSuggestion from "../components/explore/ExploreSuggestions";
import ExploreGrid from "../components/explore/ExploreGrid";

function ExplorePage() {
  return (
    <Layout>
      <ExploreSuggestion />
      <ExploreGrid />
    </Layout>
  );
}

export default ExplorePage;
