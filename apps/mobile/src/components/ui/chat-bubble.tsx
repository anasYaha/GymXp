import { StyleSheet, Text, View } from "react-native";
import { themeTokens, radii } from "../../theme/tokens";

interface ChatBubbleProps {
  name: string;
  text: string;
  time: string;
  isMe: boolean;
}

export const ChatBubble = ({ name, text, time, isMe }: ChatBubbleProps) => {
  return (
    <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
      <Text style={[styles.name, isMe ? styles.nameMe : null]}>{name}</Text>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "80%",
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  bubbleOther: {
    alignSelf: "flex-start",
    backgroundColor: themeTokens.surfaceElevated,
    borderWidth: 1,
    borderColor: themeTokens.border,
  },
  bubbleMe: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255,107,0,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,107,0,0.2)",
  },
  name: {
    fontSize: 11,
    fontWeight: "700",
    color: themeTokens.brandPrimary,
    marginBottom: 2,
  },
  nameMe: {
    color: themeTokens.brandPrimary,
  },
  text: {
    fontSize: 13,
    color: themeTokens.text,
    lineHeight: 18,
  },
  time: {
    fontSize: 9,
    color: themeTokens.textMuted,
    marginTop: 3,
  },
});
