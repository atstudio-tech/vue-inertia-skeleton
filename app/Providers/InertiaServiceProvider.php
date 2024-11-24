<?php

namespace App\Providers;

use App\Enums\FlashType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\ServiceProvider;

class InertiaServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        RedirectResponse::macro('flash', function (FlashType $type, string $title, ?string $message = null) {
            session()->flash('flash', [
                'type' => $type,
                'title' => $title,
                'message' => $message,
            ]);

            return $this;
        });

        RedirectResponse::macro('success', function (string $title = 'Success!', ?string $message = null) {
            return $this->flash(FlashType::Success, $title, $message);
        });

        RedirectResponse::macro('error', function (string $title = 'Error!', ?string $message = null) {
            return $this->flash(FlashType::Error, $title, $message);
        });

        RedirectResponse::macro('warning', function (string $title = 'Warning!', ?string $message = null) {
            return $this->flash(FlashType::Warning, $title, $message);
        });

        RedirectResponse::macro('info', function (string $title = 'Info!', ?string $message = null) {
            return $this->flash(FlashType::Info, $title, $message);
        });
    }
}
