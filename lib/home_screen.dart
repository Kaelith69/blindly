import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'theme_provider.dart'; // themeModeNotifierProvider is in here

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentTheme = ref.watch(themeModeNotifierProvider); // Changed to themeModeNotifierProvider

    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Screen'),
        actions: [
          IconButton(
            icon: Icon(currentTheme == ThemeMode.light ? Icons.dark_mode : Icons.light_mode),
            onPressed: () {
              final newTheme = currentTheme == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
              ref.read(themeModeNotifierProvider.notifier).setThemeMode(newTheme); // Changed to themeModeNotifierProvider.notifier
            },
          ),
        ],
      ),
      body: const Center(
        child: Text('Welcome to Blindly!'),
      ),
    );
  }
}
