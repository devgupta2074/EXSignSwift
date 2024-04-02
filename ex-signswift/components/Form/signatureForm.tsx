import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import CustomSignatureCanvas from "../Signature/signatureCanvas";
import SignatureCanvas from "react-signature-canvas";
interface SignatureFormProps {
  signatureCanvasRef: React.RefObject<SignatureCanvas>;
}
const SignatureForm = ({ signatureCanvasRef }: SignatureFormProps) => {
  return (
    <div className="w-full border-border bg-widget sticky flex  flex-col rounded-xl border px-4 py-6 top-20  bg-white w-full ">
      <form className="px-4 py-2">
        <fieldset className="custom-scrollbar flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col">
            <h3 className="text-foreground text-2xl font-semibold">
              Sign Document
            </h3>

            <p className="text-muted-foreground mt-2 text-sm">
              Please review the document before signing.
            </p>

            <hr className="border-border mb-8 mt-4" />

            <div className="flex flex-1 flex-col gap-y-4 w-full">
              <div>
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  type="text"
                  id="full-name"
                  className="mt-2 w-4/5 px-2 mx-1"
                  // value and onChange props
                />
              </div>

              <div className=" h-56 w-full ">
                <Label htmlFor="Signature">Signature</Label>
                <Card className="mt-2  h-4/5">
                  <CardContent className="p-0 h-full">
                    <CustomSignatureCanvas
                      signatureCanvasRef={signatureCanvasRef}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row mt-10">
              <Button
                type="button"
                className="bg-black/5 hover:bg-black/10 w-full"
                variant="secondary"
                size="lg"
                // onClick prop
              >
                Cancel
              </Button>

              <Button
                type="button"
                className="bg-[#A2E771] hover:bg-[#a2e771c2] w-full text-black"
                // onClick prop
              >
                Sign
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SignatureForm;
