import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from "./form";
interface proptypes {
  open: boolean;
  onClose: () => void;
  onSuccess: (auth: AuthState) => void;
}
export default function LoginModal({ open, onClose, onSuccess }: proptypes) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='px-7 gap-0 min-w-[50%]  max-w-[50%]  md:min-w-[40%]  md:max-w-[40%] sm:min-w-[95%] sm:max-w-[95%] xs:min-w-[98%] xs:max-w-[98%]'>
        <div className='flex flex-col  justify-center items-center'>
          <LoginForm
            modal={true}
            onSuccess={(auth) => {
              onSuccess(auth);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
