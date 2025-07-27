import React from "react";

// Import all templates
import TemplateA from "../templates/TemplateA";
import TemplateB from "../templates/TemplateB";
import TemplateC from "../templates/TemplateC";
import TemplateD from "../templates/TemplateD";
import TemplateE from "../templates/TemplateE";
import TemplateF from "../templates/TemplateF";
import TemplateG from "../templates/TemplateG";

const BillPreview = ({ bill, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case "TemplateA":
        return <TemplateA bill={bill} />;
      case "TemplateB":
        return <TemplateB bill={bill} />;
      case "TemplateC":
        return <TemplateC bill={bill} />;
      case "TemplateD":
        return <TemplateD bill={bill} />;
      case "TemplateE":
        return <TemplateE bill={bill} />;
      case "TemplateF":
        return <TemplateF bill={bill} />;
      case "TemplateG":
        return <TemplateG bill={bill} />;
      default:
        return <div className="text-red-600 font-bold">Invalid Template Selected</div>;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      {/* <h2 className="text-lg font-bold text-blue-600 mb-4">
        Bill Preview - {template}
      </h2> */}
      {renderTemplate()}
    </div>
  );
};

export default BillPreview;
