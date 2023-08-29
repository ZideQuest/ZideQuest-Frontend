import AlertAsync from "react-native-alert-async";

export default async function Alert(title, description) {
  const choice = await AlertAsync(
    title,
    description,
    [
      { text: "Confirm", onPress: () => "yes" },
      { text: "Cancel", onPress: () => Promise.resolve("no"), style: "cancel" },
    ],
    {
      cancelable: true,
      onDismiss: () => "no",
    }
  );

  if (choice === "yes") {
    return true;
  } else {
    return false;
  }
}
