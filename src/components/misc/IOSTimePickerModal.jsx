import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

export default function IOSTimePickerModal(bottomSheetModalRef) {

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={["30%"]}
      enableOverDrag={false}
      handleIndicatorStyle={{ height: 0 }}
      stackBehavior="push"
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
    ></BottomSheetModal>
  );
}
